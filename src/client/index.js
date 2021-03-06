/*
  All of this is happening on the global scope.
  BAD IDEA USE BUNDLING, this is just a demo.

  Look into webpack or rollup asap if you haven't plz 🐱
*/ const app = new Vue(
  {
    el: "#app",
    data: {
      query: null,
      recipes: [],
      searched: false,
    },
    methods: {
      search: async function() {
        /*
        Basically, we send this to GraphQL and say:
        HEY, I NEED RECIPES, but only the LINK, TITLE and THUMBNAIL kthxbai
      */ const query = `{
        recipes(ingredients: "${this.query}") {
          href,
          title,
          thumbnail
        }
      }`
        // We need to specify some things for the request to OUR SERVER
        const requestOptions = {
          headers: new Headers({ "content-type": "application/json" }),
          method: "post",
          body: JSON.stringify({ query }),
        }
        // Get ready!
        const incomingRecipes = await fetch("/graphql", requestOptions).then(rawResponse => rawResponse.json())
        // Update the "state"
        this.searched = true
        this.recipes = incomingRecipes.data.recipes
      },
    },
  }
)
