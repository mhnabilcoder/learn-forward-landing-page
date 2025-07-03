-- Update the section tagline for features to "Finally! A platform that works for educators"
UPDATE features 
SET section_tagline = 'Finally! A platform that works for educators'
WHERE section_tagline = 'What We Offer' OR section_tagline IS NULL;