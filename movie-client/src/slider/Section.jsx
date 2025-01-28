import {Slider} from "./Slider.jsx";
import {SectionControl} from "./SectionControl.jsx";

export const Section = () => {
    return (
        <div>
            <section className="banner" aria-label="Popular Movies">
                <Slider/>
                <div className="slider-control">
                    <div className="control-inner">
                        <div style={{width:"100px",height:"200px"}}>
                            <SectionControl/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
