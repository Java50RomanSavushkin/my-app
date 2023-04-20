import { productsService } from "./config/products-service-config"
import productsConfig from "./config/products-config.json"
import { getRandomElement } from "./util/random";
test("setProducts test", () => {
    productsService.setProducts().then(count => {
        expect(count).toEqual(productsConfig.length);
    })
})
test ("category bread exists", () => {
    productsService.isCategoryExist("bread")
    .then(res => expect(res).toBeTruthy());
})
test ("category kukureku doesn't exist", () => {
    productsService.isCategoryExist("kukureku")
    .then(res => expect(res).toBeFalsy());
})

test("random category exists",  () => {
  // random category
  const randomCategory = getRandomElement(productsConfig.map(product => product.name.split("-")[0]));

  // check if the random category exists
  const categoryExists =  productsService.isCategoryExist(randomCategory);

  expect(categoryExists).toBeTruthy();
});

test("removed category doesn't exist in the database",  () => {
    const categoryToRemove = "bread";
    
    // remove the category
     productsService.removeCategory(categoryToRemove);
  
    // check if the category exists
    const categoryExists =  productsService.isCategoryExist(categoryToRemove);
  
    // expect the category to not exist in the database
    expect(categoryExists).toBeFalsy();
  });
  






