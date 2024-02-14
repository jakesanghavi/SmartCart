from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import time


# Get the image representing the object
def get_image(ele):
    src_value = ""
    try:
        img_tag = ele.find_element(By.CSS_SELECTOR, 'img')
        src_value = img_tag.get_attribute('srcset')
    except NoSuchElementException:
        src_value = ""

    return src_value


# Get the text data that stores name, price, etc.
def get_text_data(ele):
    # Initialize the data to return as empty strings. If the desired data doesn't exist,
    # return nothing for it.
    text_list = []
    unit_price = ""
    individual_weight = ""
    stock = ""

    try:
        # Find all leaf-node spans (no children spans)
        text_data = ele.find_elements(By.CSS_SELECTOR, 'span:not(:has(span))')

        # Filter by length > 2. For some reason, price is stored as "$0.18",
        # and then also "$", "0", "1", "8", so we want to ignore these
        for span in text_data:
            html = span.text
            if len(html) > 2:
                text_list.append(html)

                # Get the unit price. Not all items have this attribute
        try:
            unit_price = ele.find_element(By.CSS_SELECTOR, 'div[title]').text
        except NoSuchElementException:
            unit_price = ""

        # There are at most 4 text objects below the item, stored in divs.
        # The bottom-most one will tell us the weight. We start at 4 (the lowest)
        # which will give us the "in stock" information (if any).
        # So long as "stock" isn't mentioned, it's the weight, and we can exit the loop.
        k = 4
        while k > 0:
            try:
                # Try to find the element with the specified CSS selector
                individual_weight_element = ele.find_element(By.CSS_SELECTOR,
                                                             f'div[aria-label="Product"] a div:nth-child(2) '
                                                             f'div:nth-child({k})')

                if 'stock' in individual_weight_element.text:
                    stock = individual_weight_element.text
                    k -= 1
                    continue

                else:
                    individual_weight = individual_weight_element.text
                    k = 0
            except NoSuchElementException:
                # If not found, set individual_weight to an empty string
                individual_weight = ""
                k -= 1

    except NoSuchElementException:
        return text_list, unit_price, individual_weight, stock

    return text_list, unit_price, individual_weight, stock


# Scroll to the desired carousel within the web page and click on the button
# to expand the listed items.
def scroll_to_carousel_and_click(car, driver):
    # Locate the desired div
    first_div_child = car.find_element(By.CSS_SELECTOR, 'div:nth-child(1)')
    second_div = first_div_child.find_element(By.CSS_SELECTOR, 'div:nth-child(2)')

    #     # Scroll to the div containing our carousel of interest
    #     ActionChains(driver).move_to_element(second_div).perform()

    # Scroll to put element in middle of screen

    element_y = second_div.location['y']

    # Get the height of the browser window
    window_height = driver.execute_script('return window.innerHeight;')

    # Calculate the offset to scroll the element to the middle of the page
    scroll_offset = element_y - (window_height / 2)

    # Use JavaScript to scroll the page
    driver.execute_script(f'window.scrollTo(0, {scroll_offset});')

    # Expand the items so we can view them all
    first_button = second_div.find_element(By.CSS_SELECTOR, 'button:nth-child(1)')
    first_button.click()


# Scroll to the bottom of the given modal
def scroll_to_bottom_of_modal(mod, driver):
    time.sleep(0.5)
    # Scrolling to the bottom may take multiple tries as elements load slowly.
    # Two scrolls works for now but may need to add more
    driver.execute_script("arguments[0].scrollTo(0, arguments[0].scrollHeight);", mod)
    time.sleep(1)
    driver.execute_script("arguments[0].scrollTo(0, arguments[0].scrollHeight);", mod)


# Parse the text into a useful format.
def parse_text_data(text_data_list, src_data):
    # Initialize the data to return as empty strings. If the desired data doesn't exist,
    # return nothing for it.
    tags = []
    price = ""
    name = ""
    units = ""

    # The src is a list of links. We just get the first one.
    src = src_data.split()
    if len(src) != 0:
        src = src[0]
    else:
        src = ""

    # Remove empty strings.
    text_data_list = [element for element in text_data_list if element.strip() != ""]

    print(text_data_list)

    # The price will be the only element to start with "$". This line finds the index of that element
    try:
        price_index = next(i for i, element in enumerate(text_data_list) if element.startswith("$"))
    except StopIteration:
        # If the price isn't found, just return None for all attributes of the item. This will be fixed later
        return None, None, None, None, None

    try:
        # If there are units for the item, it starts with a '/' or 'each'. Not all items have this. But, if
        # it exists, we store it and then remove it from the list of data.
        units_index = next(
            i for i, element in enumerate(text_data_list) if element.startswith("/") or element.startswith("each"))
        units = text_data_list.pop(units_index)
    except StopIteration:
        units_index = None

        # Loop through the text data
    for i in range(len(text_data_list)):
        # If an item is before the price index, it is a "tag". Things like "organic", "non-gmo"
        if i < price_index:
            tags.append(text_data_list[i])
        #  If an item is at the price index, store it as the price
        elif i == price_index:
            price = text_data_list[i]
        # Whatever is right after the price will be the item name
        elif i == price_index + 1:
            name = text_data_list[i]

    return tags, price, name, units, src


# Function to scroll slowly to the bottom
def slow_scroll_to_bottom(driver):
    actions = ActionChains(driver)
    t = 0

    # If it's been longer than 10 seconds, something has likely gone wrong.
    # So, cut off the scroll early and go back to the top
    while t < 10:
        actions.send_keys(Keys.PAGE_DOWN).perform()
        # Adjust the sleep time based on your needs
        time.sleep(1)
        # Check if you've reached the bottom of the page
        if driver.execute_script("return (window.innerHeight + window.scrollY) >= document.body.scrollHeight;"):
            break

        t += 1


# Defines the way to sort the reakit portals in the same order as the carousels
def get_mapping_index(element, mapping):
    try:
        return next(
            i
            for i, item in enumerate(mapping)
            if
            item == element.find_element(By.CSS_SELECTOR, 'div:first-child div:first-child').get_attribute('aria-label')
        )
    except StopIteration:
        return None  # Return None if no match is found


def carousel_filter(carousels):
    mapping = []
    final_carousels = []
    for x in range(len(carousels)):
        try:
            category_label = carousels[x].find_element(By.CSS_SELECTOR, 'div:nth-child(1) div:nth-child(1) h2 '
                                                                        'div:nth-child(1)')
        except NoSuchElementException:
            continue
        category_text = category_label.text
        mapping.append(category_text)
        final_carousels.append(carousels[x])

    return final_carousels, mapping


def reakit_filter(portals, fake_labels, mapping):
    reakit_portals = []

    # If the portal has one of the above labels, don't add it to our portal list.
    for p in portals:
        ele = p.find_element(By.CSS_SELECTOR, 'div:first-child div:first-child')
        label = ele.get_attribute('aria-label')
        if label not in fake_labels and label is not None:
            reakit_portals.append(p)

    # Filter out elements with no match in mapping
    filtered_portals = [portal for portal in reakit_portals if get_mapping_index(portal, mapping) is not None]

    # Sort the filtered portals based on the index in the mapping list
    reakit_portals = sorted(filtered_portals, key=lambda x: get_mapping_index(x, mapping))
    return reakit_portals
