import {SortBySubCategoryMovie} from "../../components/SortBySubCategoryMovie.jsx";
import {getAllMovie} from "../../service/GetAllMovie.jsx";

export const Anime = () => {
    const movie = getAllMovie()
    return (
        <div>
            <section className="movie-list" aria-label="Bollywood Movies...">
                <div className="title-wrapper">
                    <h3 className="title-large">Animelar...</h3>
                </div>

                <div className="slider-list">
                    <div className="slider-inner">
                        <SortBySubCategoryMovie name={"ANIME"} data={movie} isMovie={true}/>
                    </div>
                </div>
            </section>
        </div>
    )
}