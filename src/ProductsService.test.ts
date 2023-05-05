/**
 * @jest-environment node
 */
import { productsService } from "./config/products-service-config"
import productsConfig from "./config/products-config.json"
import { getRandomElement } from "./util/random";
jest.setTimeout(300000)
const categories: string[] = productsConfig.map(pc => pc.name.split("-")[0]);
test("setProducts test", () => 
    productsService.setProducts().then(count => {
        expect(count).toEqual(productsConfig.length);
    })
)
test ("random category exists", ()=> {
    const category = getRandomElement(categories);
    return productsService.isCategoryExist(category)
    .then(res => expect(res).toBeTruthy());
})
test ("category kukureku doesn't exist", () => 
    productsService.isCategoryExist("kukureku")
    .then(res => expect(res)).then(res=>res.toBeFalsy())
)
test ("all categories exist test",  () => 
    Promise.all(categories.map(c => productsService.isCategoryExist(c)))
    .then(res => expect(res.every(v => v))).then(res=>res.toBeTruthy())
    
)
test ("remove category test", () => 
    productsService.removeCategory(categories[0])
    .then(() =>productsService.isCategoryExist(categories[0])
    .then(res => expect(res).toBeFalsy()) )
    
)
test ("add category test", () => 
    productsService.addCategory({name: categories[0]})
    .then(() =>productsService.isCategoryExist(categories[0])
    .then(res => expect(res).toBeTruthy()) )
    
)