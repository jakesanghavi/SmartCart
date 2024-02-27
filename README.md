# SmartCart

**For Python, install:**
pip install supabase
pip install python-dotenv

**For website:**

1. Install Node.js
2. `cd smartcart` to enter website folder
3. Open terminal in javascript
4. run `npm install` to install all missing packages
5. `npm install @supabase/supabase-js`
6. Use `npm start` to launch

## Future Changes:

Downgrading react-scripts to 4.0.3 resolves the process.env issues AND removes the need for changing webpack.config.js fallback options.
It does require deleting package-lock.json and node_modules though, and then proceeding to do a new npm install.

We can make our migration to this new react-scripts version after the demo.
