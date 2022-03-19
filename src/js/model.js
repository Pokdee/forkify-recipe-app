export const state = {
  recipe: {},
};
export const Loadrecipe = async function (id) {
  try {
    const req = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id.slice(1)}
            `
    );
    const data = await req.json();

    if (!req.ok) {
      throw new Error(`Not found (status : ${data.status})`);
    }
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      srcUrl: recipe.source_url,
      Image: recipe.image_url,
      serving: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.log(error.message);
  }
};
