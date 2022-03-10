USE Taste_Then_Tell;

SELECT
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
Union
SELECT
    name
From
    Dining_Halls
where
    name like "U%";