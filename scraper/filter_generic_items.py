import pandas as pd
import re

# Read in generic item list. Request access from me if you want it, at 15 MB it's not worth uploading
df = pd.read_csv('generic.csv')
# Only keep the name column, but keep type as DF
df = df.drop(columns=['index', 'input', 'qty', 'range_end', 'unit', 'comment'])
# Make everything lowercase and drop duplicates
df['name'] = df['name'].str.lower()
df = df.drop_duplicates(subset=['name']).reset_index(drop=True)

# Divide into single/plural items. Things like 'egg' and 'eggs'
# should not both show in the search. For most things, plural is preferred.
# ex. it's more natural to buy "blueberries" than "blueberry"
# However, not everything has a plural. ex. "squash"
# We don't account for complex plurals here (ones not ending in 's')
df_singles = df.loc[~df['name'].str.endswith('s', na=False)]
df_singles = df_singles.loc[df_singles['name'] != '']
df_singles = df_singles.dropna()
df_plurals = df.loc[df['name'].str.endswith('s', na=False)]
df_plurals = df_plurals.loc[df_plurals['name'] != '']
df_plurals = df_plurals.dropna()

# Loop over the list of single items and get the item stored in each
for x in range(0, len(df_singles)):
    words = df_singles['name'].iloc[x]
    # If the plural of the item is found in our plural list, mark the item
    # for removal in the single list
    if words + 's' in df_plurals['name'].values:
        df_singles['name'].iloc[x] = ''

# Remove all of the single items that were marked for deletion
df_singles = df_singles.loc[df_singles['name'] != ''].reset_index(drop=True)

# Concatenate our two dfs
df_final = pd.concat([df_singles, df_plurals])
# Remove any leading/trailing spaces and get rid of any remaining duplicates
# Then write to CSV
df_final['name'] = df_final['name'].str.strip()
df_final = df_final.drop_duplicates().reset_index(drop=True)
df_final.to_csv('final_generic_items.csv', index=False)

# Use a regex to remove any entries containing characters that are not
# either alphabetical, "-", or " "
pattern = '^[a-zA-Z\- ]+$'

# Apply this pattern to df_final to make a new df. Then, write the new df to csv
filtered_final = df_final[df_final['name'].astype(str).str.match(pattern)].reset_index(drop=True)
filtered_final.to_csv('filtered_final_generic_items.csv', index=False)
