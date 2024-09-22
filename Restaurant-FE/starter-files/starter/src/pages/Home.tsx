import { AllRest } from "../components/AllRest";
import { Cuisines } from "../components/Cuisines";
import { MostPopular } from "../components/MostPopular";
import { Surprise } from "../components/Surprise";

export function Home(){
    return (
        <main>
            <Surprise/>
            <MostPopular/>
            <Cuisines/>
            <AllRest/>
        </main>
    )
}