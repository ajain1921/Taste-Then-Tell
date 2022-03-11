USE Taste_Then_Tell;

SELECT
    name,
    dining_hall_id,
    COUNT (DISTINCT food_id)
FROM
    Schedules s NATURAL
    JOIN Food_Allergens f NATURAL
    JOIN Dining_Halls d
WHERE
    s.food_id NOT IN (
        SELECT
            DISTINCT food_id
        FROM
            Food_Allergens f1
        WHERE
            f1.allergen LIKE "%wheat%"
    )
GROUP BY
    d.dining_hall_id;