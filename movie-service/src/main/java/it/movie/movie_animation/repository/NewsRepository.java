package it.movie.movie_animation.repository;

import it.movie.movie_animation.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface NewsRepository extends JpaRepository<News, UUID> {
    List<News> findAllByEndDateBeforeAndIsArchivedFalse(LocalDate date); // bunda mudati tugagan reklamalar lekin hali arxivlanmagan reklamalar
//    List<News> findAllByEndDateBeforeAndIsArchivedFalse(LocalDateTime date); // bunda mudati tugagan reklamalar lekin hali arxivlanmagan reklamalar

    //    List<News> findAllByIsArchivedFalseAndEndDateAfter(LocalDateTime date); // bu muddati tugamagan reklamalar userlar uchun tugasa yoqolib ketadi
    List<News> findAllByIsArchivedFalseAndEndDateAfter(LocalDate date); // bu muddati tugamagan reklamalar userlar uchun tugasa yoqolib ketadi

    List<News> findAllByIsArchivedTrue(); //muddati tugab arxivlangan reklamalar
}
