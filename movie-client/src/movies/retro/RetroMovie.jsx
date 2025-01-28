import {SortBySubCategoryMovie} from "../../components/SortBySubCategoryMovie.jsx";
import {getAllMovie} from "../../service/GetAllMovie.jsx";

export const RetroMovie = () => {
    const movie = getAllMovie()
    return (
        <div>
            <section className="movie-list" aria-label="Top Rated Movies...">
                <div className="title-wrapper">
                    <h3 className="title-large">Retro Kinolar...</h3>
                </div>

                <div className="slider-list">
                    <div className="slider-inner">
                        <SortBySubCategoryMovie name={"RETRO"} isMovie={true} data={movie}/>
                    </div>
                </div>
            </section>
        </div>
    )
}