import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { ingredients } = await request.json();

        // Here we'll use a simple mapping for now, but in production
        // you would integrate with an AI service like OpenAI
        const suggestions = generateRecipeSuggestions(ingredients);

        return NextResponse.json({ suggestions });
    } catch (error) {
        console.error('Error in suggest-recipes:', error);
        return NextResponse.json(
            { error: 'Failed to generate recipe suggestions' },
            { status: 500 }
        );
    }
}

function generateRecipeSuggestions(ingredients) {
    // This is a simple simulation - in production, you'd use an AI service
    const recipeDatabase = {
        'ground chicken': ['Chicken Burger', 'Chicken Meatballs', 'Chicken Tacos'],
        'ground beef': ['Beef Burgers', 'Meatballs', 'Sloppy Joes'],
        'lettuce': ['Salad', 'Burger Topping', 'Lettuce Wraps'],
        'tomato': ['Tomato Sauce', 'Salsa', 'Bruschetta'],
        'onions': ['Caramelized Onions', 'Onion Soup', 'Stir Fry'],
        'flour': ['Bread', 'Cookies', 'Pancakes'],
        'eggs': ['Omelette', 'Frittata', 'Baked Goods'],
        'milk': ['Bechamel Sauce', 'Pancakes', 'Smoothies'],
        'cheese': ['Grilled Cheese', 'Mac and Cheese', 'Pizza'],
        'rice': ['Stir Fry', 'Rice Pilaf', 'Fried Rice'],
        'pasta': ['Spaghetti', 'Mac and Cheese', 'Pasta Salad'],
    };

    const suggestions = new Set();
    
    ingredients.forEach(ingredient => {
        const lowercaseIngredient = ingredient.toLowerCase();
        Object.entries(recipeDatabase).forEach(([key, recipes]) => {
            if (lowercaseIngredient.includes(key)) {
                recipes.forEach(recipe => suggestions.add(recipe));
            }
        });
    });

    // If we have multiple ingredients, prioritize recipes that use more of them
    const sortedSuggestions = Array.from(suggestions).sort((a, b) => {
        const aMatches = ingredients.filter(ing => 
            a.toLowerCase().includes(ing.toLowerCase())
        ).length;
        const bMatches = ingredients.filter(ing => 
            b.toLowerCase().includes(ing.toLowerCase())
        ).length;
        return bMatches - aMatches;
    });

    // Return top 5 suggestions
    return sortedSuggestions.slice(0, 5);
} 