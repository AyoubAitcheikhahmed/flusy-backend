export class RestaurantOwnerDTO {
  constructor(email, firstName, lastName, restaurant = null) {
    this.email = email || 'UNKNOWN';
    this.firstName = firstName || 'UNKNOWN';
    this.lastName = lastName || 'UNKNOWN';
    console.log("CLASS",restaurant);
    if (restaurant) {

      this.restaurant = {
        id: restaurant.id || 'UNKNOWN',
        name: restaurant.name || 'UNKNOWN',
        address: restaurant.address || 'UNKNOWN',
      };
    } else {
      this.restaurant = {
        id: 'UNKNOWN',
        name: 'UNKNOWN',
        address: 'UNKNOWN',
      };
    }
  }
}
