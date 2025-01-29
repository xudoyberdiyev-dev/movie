package it.movie.movie_animation.service;

import it.movie.movie_animation.entity.News;
import it.movie.movie_animation.implment.service.NewsServiceImpl;
import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.ReqNewsDto;
import it.movie.movie_animation.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NewsService implements NewsServiceImpl {
    private final NewsRepository newsRepository;

    @Override
    public ApiResponse addNews(ReqNewsDto reqNewsDto) {
        try {
            newsRepository.save(
                    News.builder()
                            .name(reqNewsDto.name())
                            .img(reqNewsDto.img())
//                            .startDate(LocalDateTime.now())//bu qoshilgan vaqtni olad
                            .startDate(LocalDate.now())//bu qoshilgan vaqtni olad
//                            .endDate(LocalDateTime.now().plusMinutes(2))//bunda qoshilgan vaqtdan boshlab 2 daqiqa turadi va arxivlanib ketadi
                            .endDate(LocalDate.now().plusDays(7))//bunda qoshilgan vaqtdan boshlab 2 daqiqa turadi va arxivlanib ketadi
                            .isArchived(false)
                            .build()
            );
            return new ApiResponse("reklama qoshildi admin aka", true);
        } catch (Exception e) {
            return new ApiResponse("reklama qoshishda hatolik", false);
        }
    }

    @Override
    public ApiResponse deleteNews(UUID id) {
        try {
            News news = newsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getNews"));
            newsRepository.delete(news);
            return new ApiResponse("News ochirib tashlandi", true);
        } catch (Exception e) {
            return new ApiResponse("news ochirishda hatolik", false);
        }

    }

    // Har kuni soat 00:00 da ishga tushadi
    @Override
    @Scheduled(cron = "0 0 0 * * *")  // cron: Har kuni soat 00:00 da
    public void archiveExpiredNews() {
        // EndDate sanasi o'tgan, ammo hali arxivlanmagan reklamalarni topish
        List<News> expiredNews = newsRepository.findAllByEndDateBeforeAndIsArchivedFalse(LocalDate.now());

        // Har bir o'tgan reklamani arxivlash
        for (News news : expiredNews) {
            news.setArchived(true); // Arxivga o'tkazish
            newsRepository.save(news); // Arxivga saqlash
        }
    }

    //bu minutga
//    @Scheduled(fixedRate = 60000)
//    // bu har daqiqada habar olib turadi reklama vaqti tugagan yoki yoq yani vaqt boyicha bolsa shunday boladi
//    public void archiveExpiredNews() {
//        // EndDate sanasi o'tgan, ammo hali arxivlanmagan reklamalarni topish
//        List<News> expiredNews = newsRepository.findAllByEndDateBeforeAndIsArchivedFalse(LocalDate.now());
//
//        // Har bir o'tgan reklamani arxivlash
//        for (News news : expiredNews) {
//            news.setArchived(true); // Arxivga o'tkazish
//            newsRepository.save(news); // Arxivga saqlash
//        }
//    }
}
