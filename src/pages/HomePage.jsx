import BikeGrid from "../components/BikeGrid";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";


export default function HomePage(){
    return(
     
        <div className="min-h-screen bg-white">
            <Header />
            <Hero />
            <BikeGrid />
            <Footer />
        </div>

    )
}