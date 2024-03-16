import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Schnitzel',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/1024px-Schnitzel.JPG',
      ingredients: ['French Fries', 'Pork Meat', 'Salad'],
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/1024px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
      ingredients: ['Spaghetti', 'Meat', 'Tomatoes'],
    },
  ];

  constructor() {}

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string): Recipe {
    let recipe: Recipe;
    recipe = this.recipes.find((recipe) => {
      return recipe.id === recipeId;
    })!;
    return recipe;
  }

  deleteRecipe(recipeId: string) {
    // Filter out the recipe with the specified recipeId
    this.recipes = this.recipes.filter((recipe) => {
        // Keep only the recipes whose id does not match the specified recipeId
        return recipe.id !== recipeId;
    });

    
}


  // deleteRecipe(recipeId: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //       this.recipes = this.recipes.filter((recipe) => {
  //           return recipe.id !== recipeId;
  //       });
  //       resolve(); // Resolve the promise once the deletion is completed
  //       // Optionally, you can handle errors and reject the promise if needed
  //   });
// }



}