import {SortBySubCategoryMovie} from "../../components/SortBySubCategoryMovie.jsx";
import {getAllMovie} from "../../service/GetAllMovie.jsx";

export const HindMovie = () => {
    const movie = getAllMovie()
    return (
        <div>
            <section className="movie-list" aria-label="Telegu Movies...">
                <div className="title-wrapper">
                    <h3 className="title-large">Hind Kinolar...</h3>
                </div>

                <div className="slider-list">
                    <div className="slider-inner">
                        <SortBySubCategoryMovie name={"HIND"} data={movie} isMovie={true}/>
                    </div>
                </div>
            </section>
        </div>
    )
}