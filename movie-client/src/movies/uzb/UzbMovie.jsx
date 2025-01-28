import {SortBySubCategoryMovie} from "../../components/SortBySubCategoryMovie.jsx";
import {getAllMovie} from "../../service/GetAllMovie.jsx";

export const UzbMovie = () => {
    const movie = getAllMovie()
    return (
        <div>
            <section className="movie-list" aria-label="Tamil Movies...">
                <div className="title-wrapper">
                    <h3 className="title-large">Uzbek Kinolar...</h3>
                </div>

                <div className="slider-list">
                    <div className="slider-inner">
                        <SortBySubCategoryMovie data={movie} isMovie={true} name={"UZB"}/>
                    </div>
                </div>
            </section>
        </div>
    )
}