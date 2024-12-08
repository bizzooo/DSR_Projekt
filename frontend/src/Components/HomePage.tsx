import Content from "./Content"
import Footer from "./Footer"
import Navbar from "./Navbar"

export const HomePage = ():JSX.Element =>{
     return(
          <div>
               <Navbar />
               <Content />
               <Footer />
          </div>
     )
}