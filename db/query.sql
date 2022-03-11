USE Taste_Then_Tell;

/* SELECT
 name
 From
 Dining_Halls
 where
 university_id in (
 SELECT
 university_id
 from
 Universities
 where
 name like "U%"
 )
 Intersect
 SELECT
 name
 From
 Dining_Halls
 where
 name like "U%"; */
Select
    *
from
    Foods
    join Food_Allergens on Foods.food_id = Food_Allergens.food_id
    /* Select
     *
     From
     Dining_Halls
     order by
     dining_hall_id desc; */