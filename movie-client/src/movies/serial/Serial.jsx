import {SortBySubCategoryMovie} from "../../sortBySubCategory/SortBySubCategoryMovie.jsx";
import {getAllMovie} from "../../service/GetAllMovie.jsx";

export const Serial = () => {
    const movie = getAllMovie()
    return (
        <div>
            <section className="movie-list" aria-label="Top Rated Movies...">
                <div className="title-wrapper">
                    <h3 className="title-large">Seriallar...</h3>
                </div>
                <div className="slider-list">
                    <div className="slider-inner">
                        <SortBySubCategoryMovie name={"SERIAL"} data={movie} isMovie={true}/>
                    </div>
                </div>
            </section>
        </div>
    )
}