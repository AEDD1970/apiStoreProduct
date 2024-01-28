import { countries } from "src/utils/_ISO-countries"

export  const  validationCity =  async (city:string) => {
    const validateCodeCity = countries.map(item => item.code)
       //validate code city 
       if (city.length > 3) {
        return { message: `the city code input ${city} wants to see three character`, status: 'BAD_REQUEST' }
      }
      if (!validateCodeCity.includes(city)) {
        return {
          message: 'code city invalid  ', status: 'NOT_FOUND', data: {
            codeCity: countries
          }
        };
      }
}

export  const  validationProduct=  async (type:string) => {
    const typesProducts= ["PERISHABLE", "NONPERISHABLE"]
       //validate code city 
       if (!typesProducts.includes(type)) {
        return { message: `The type ${type} of product you enter is not valid `, status: 'BAD_REQUEST'  ,
        data: {
            typeProducts: typesProducts
          }
         }
      }

}