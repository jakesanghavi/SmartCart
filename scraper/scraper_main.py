import pandas as pd
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scraper_utils import *

# Define your store name. original_store is used in the dataframe
# and file name creation if the store name has spaces
store = "Giant Eagle"
original_store = store

# If the store has spaces, replace them with dashes to make them compatible
# with instacart URLs
if ' ' in store:
    store = '-'.join(store.split())

# Initialize the df to store all of our data
df = pd.DataFrame(columns=["Store", "Item Name", "Price", "Units", "Unit Price", "Amount", "Tags", "In Stock", "Image"])

# Load your webdriver
# driver = webdriver.Chrome(ChromeDriverManager().install())
driver = webdriver.Chrome(executable_path='/Users/jakesanghavi/Downloads/chromedriver-mac-arm64/chromedriver')
driver.maximize_window()

# Open Instacart to your desired store
driver.get(f'https://www.instacart.com/{store}')
wait = WebDriverWait(driver, 5)  # Maximum wait time of 5 seconds

# Remove modals that block website
elements_to_delete = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'ReactModalPortal')))

for element in elements_to_delete:
    driver.execute_script("arguments[0].remove();", element)

# This allows us to scroll and click again
body_element = driver.find_element_by_tag_name('body')
driver.execute_script("arguments[0].style.overflow = 'visible';", body_element)

# Scroll slowly to the bottom
slow_scroll_to_bottom(driver)

# Wait 2 seconds to allow for final loading
time.sleep(2)

# Find all elements with aria-label="item carousel"
# These are the product groupings we want to jump into
carousels = driver.find_elements(By.CSS_SELECTOR, '[aria-label="item carousel"]')

carousels, mapping = carousel_filter(carousels)

# These divs contain the buttons we need to click on within each item carousel
portals = driver.find_elements(By.CLASS_NAME, '__reakit-portal')

# Some reakit portals do not correspond to carousels
fake_labels = ['Welcome', 'Join an Instacart+ family account dialog', 'Cart', 'Coupon',
               'Use backup payment method for added items?', '100% satisfaction guarantee', '']

reakit_portals = reakit_filter(portals, fake_labels, mapping)

# List of dataframes to be concatenated later.
to_concat = []

# If we remove the useless portals, we can start from 0
j = 0

# Iterate through each div
for carousel in carousels:
    print(j)
    # Scroll to where the carousel is located and click to expand its tems
    scroll_to_carousel_and_click(carousel, driver)

    # Set a variable equal to the modal that opens
    reakit_id = reakit_portals[j].find_element(By.CSS_SELECTOR, 'div:nth-child(1) div:nth-child(1)').get_attribute('id')

    modal = driver.find_element(By.CSS_SELECTOR, f'div#{reakit_id} > div:nth-child(2)')

    # Scroll to the bottom of the modal to load all of its elements
    # Careful here: may not load all products. We may have to add slower scrolling
    scroll_to_bottom_of_modal(modal, driver)

    # Get all li objects from the list in the modal. These are the grocery items.
    product_list = modal.find_elements(By.CSS_SELECTOR, 'div:nth-child(1) ul li')

    # Iterate through the listed products
    for product in product_list:
        # Get the image representing the item
        src_value = get_image(product)

        # Get the other textual data about the item
        text_list, unit_price, individual_weight, stock = get_text_data(product)

        # Parse the text data into useful data
        tags, price, name, units, src = parse_text_data(text_list, src_value)

        # Add our dataframe of data to a list of dataframes. These will be concatenated to the full df later.
        cols = df.columns
        row = pd.DataFrame(data=[[original_store, name, price, units, unit_price, individual_weight, tags, stock, src]],
                           columns=cols)

        to_concat.append(row)

    close_button = reakit_portals[j].find_element(By.CSS_SELECTOR, '[aria-label="Close"]')
    close_button.click()

    j += 1

# Close the browser
driver.quit()

# Add all of our results to the full dataframe
df = pd.concat([df] + to_concat, ignore_index=True)

# Sometimes there is no unit price, but it gets set anyway
# It always gets set the amount/weight in this case
# So, if these two are the same, then set unit price
# to be an empty string
mask = df['Unit Price'] == df['Amount']
df.loc[mask, 'Unit Price'] = ""

# Drop duplicates here - sometimes there is a "favorites" section
# Which contains repeated items
df = df.drop_duplicates(subset=['Item Name', 'Price', 'Amount'])

# If the item name isn't presnet, something has gone wrong. In this
# case, just throw the row away
df = df.dropna(subset=['Item Name'])

# Save the dataframe to csv
df.to_csv(f"{'_'.join(original_store.split())}.csv", index=False)
