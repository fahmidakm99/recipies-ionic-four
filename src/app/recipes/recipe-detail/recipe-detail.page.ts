import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss']
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe!: Recipe;
  recipeId!: string  ;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        // redirect
        this.router.navigate(['/recipes']);
        return;
      }
   
       const recipeeId= paramMap.get('recipeId')??this.recipeId;
      this.loadedRecipe = this.recipesService.getRecipe(recipeeId);
    });
  }

  onDeleteRecipe() {
    this.alertCtrl
      .create({
        header: 'Are you sure?',
        message: 'Do you really want to delete the recipe?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
            this.recipesService.deleteRecipe(this.loadedRecipe.id);
            
              this.router.navigate(['/recipes']);
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

//   onDeleteRecipe() {
//     this.alertCtrl
//       .create({
//         header: 'Are you sure?',
//         message: 'Do you really want to delete the recipe?',
//         buttons: [
//           {
//             text: 'Cancel',
//             role: 'cancel',
//           },
//           {
//             text: 'Delete',
//             handler: () => {
//               // Call the deleteRecipe method from recipesService and handle any asynchronous operations
//               this.recipesService.deleteRecipe(this.loadedRecipe.id)
//                 .then(() => {
//                   // Recipe deleted successfully, navigate to the recipes page
//                   this.router.navigate(['/recipes']);
//                 })
//                 .catch(error => {
//                   // Handle any errors that occur during deletion
//                   console.error('Error deleting recipe:', error);
//                   // Optionally, display an error message to the user
//                 });
//             }
//           }
//         ]
//       })
//       .then(alertEl => {
//         // Present the confirmation alert to the user
//         alertEl.present();
//       });
// }

}
