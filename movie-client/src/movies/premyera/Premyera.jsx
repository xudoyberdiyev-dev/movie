import {SortBySubCategoryMovie} from "../../sortBySubCategory/SortBySubCategoryMovie.jsx";
import {getAllMovie} from "../../service/GetAllMovie.jsx";

export const Premyera = () => {
    const movie = getAllMovie()
    return (
        <div>
            <section className="movie-list" aria-label="Week Trending Movies...">
                <div className="title-wrapper">
                    <h3 className="title-large">Premyera kinolar</h3>
                </div>

                <div className="slider-list">
                    <div className="slider-inner">
                        <SortBySubCategoryMovie data={movie} isMovie={true} name={"PREMYERA"}/>
                    </div>
                </div>
            </section>
        </div>
    )
}