import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";

export default async function RecettesPage() {
    const recettes = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
        .then(res => res.json());
    return (
        <div>
            <h1 className="text-2xl font-bold p-4">Mon super site de Recettes</h1>
            <div className="flex flex-row flex-wrap gap-4 justify-center">
                {recettes.meals.map((recette: any) => (
                    <Suspense key={recette.idMeal} fallback={<RecetteCardSkeleton />}>
                        <RecetteCard recette={recette}></RecetteCard>
                    </Suspense>
                ))}
            </div>
        </div>
    );
}

async function RecetteCard(params: { recette: Recette }) {
    const delay = Math.floor(Math.random() * 2000) + 1000; // random between 1000ms and 3000ms
    if (process.env.DELAY === "true") {
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return (
        <Card className="w-full max-w-md overflow-hidden ml-4">
            <div className="relative h-48">
                <Image
                    src={params.recette.strMealThumb}
                    alt={params.recette.strMeal}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <CardHeader className="absolute bottom-0 z-10 text-white w-full">
                    <CardTitle>{params.recette.strMeal}</CardTitle>
                    <CardDescription className="text-gray-200 w-full">
                        {params.recette.strCategory} • {params.recette.strArea}
                    </CardDescription>
                </CardHeader>
            </div>

            <CardContent className="pt-6">
                <p className="text-gray-700">
                    {params.recette.strInstructions.substring(0, 140)}...
                </p>
            </CardContent>

            <CardFooter>
                <Button className="w-full">Voir la recette</Button>
            </CardFooter>
        </Card>
    );
}

function RecetteCardSkeleton() {
    return (
        <Card className="p-4 w-48 h-64 animate-pulse">
            <CardTitle>Loading...</CardTitle>
        </Card>
    );
}


type Recette = {
    idMeal: string;
    strMeal: string;
    strMealAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string;
    strIngredient1: string | null;
    strIngredient2: string | null;
    strIngredient3: string | null;
    strIngredient4: string | null;
    strIngredient5: string | null;
    strIngredient6: string | null;
    strIngredient7: string | null;
    strIngredient8: string | null;
    strIngredient9: string | null;
    strIngredient10: string | null;
    strIngredient11: string | null;
    strIngredient12: string | null;
    strIngredient13: string | null;
    strIngredient14: string | null;
    strIngredient15: string | null;
    strIngredient16: string | null;
    strIngredient17: string | null;
    strIngredient18: string | null;
    strIngredient19: string | null;
    strIngredient20: string | null;
    strMeasure1: string | null;
    strMeasure2: string | null;
    strMeasure3: string | null;
    strMeasure4: string | null;
    strMeasure5: string | null;
    strMeasure6: string | null;
    strMeasure7: string | null;
    strMeasure8: string | null;
    strMeasure9: string | null;
    strMeasure10: string | null;
    strMeasure11: string | null;
    strMeasure12: string | null;
    strMeasure13: string | null;
    strMeasure14: string | null;
    strMeasure15: string | null;
    strMeasure16: string | null;
    strMeasure17: string | null;
    strMeasure18: string | null;
    strMeasure19: string | null;
    strMeasure20: string | null;
    strSource: string | null;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
};