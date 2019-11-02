# FIFA Dream Team
A project for CS506 Software Engineering at the University of Wisconsin - Madison.

# Developers
Andres Paredes / 
Andrew Goethel / 
Sean Cohen / 
Kshitij Kumar / 
William Bravo /

# To Run
## Online
visit https://fifadreamteam.000webhostapp.com/ to view the website

## Locally
The developers have independently been using different ways to run the code locally. One of the following ways is the following (assuming you already have Node installed)

### Installing
In terminal, type the following:

    npm install -g http-server
    navigate to /DraftPageReact folder
    npm run build <--- Builds the React app page for drafting, needed, otherwise draft page will not work for Dev, once prod ready, we will only include minified and built files for but ease of examining our code we left it unbuilt.

### Running
You must now go back to the directory with the index.html file, and type the following:

    http-server -c-1

Then open up a browser (Chrome) and copy and paste the url given to you by running this command into the URL of the browser and you will see our system locally

# To Run Draft Page
Currently, there is an issue with connecting the Draft Page (React) with the rest of the pages, so for the moment you will have to view this page separately. To see how to do this, click on the DraftPageReact folder in the repository and follow that README.md file




