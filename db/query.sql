USE Taste_Then_Tell;

/* Select
 *
 From
 Schedules s natural
 join Food_Allergens f natural
 join Dining_Halls d
 where
 d.name like "%PAR%"
 and s.food_id Not in (
 Select
 distinct food_id
 from
 Food_Allergens
 where
 f.allergen like "%wheat%"
 );
 
 group by
 s.food_id */
Select
    COUNT(user_id),
    university_id
From
    Students
group by
    university_id