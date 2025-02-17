import {SortBySubCategoryMovie} from "../../sortBySubCategory/SortBySubCategoryMovie.jsx";
import {getAllMovie} from "../../service/GetAllMovie.jsx";

export const Multfilm = () => {
    const movie = getAllMovie()
    return (
        <div>
            <section className="movie-list" aria-label="Upcoming Movies...">
                <div className="title-wrapper">
                    <h3 className="title-large">Multfilmar...</h3>
                </div>

                <div className="slider-list">
                    <div className="slider-inner">
                        <SortBySubCategoryMovie data={movie} name={"MULTFILM"} isMovie={true}/>
                    </div>
                </div>
            </section>
        </div>
    )
}