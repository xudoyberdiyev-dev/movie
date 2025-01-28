package it.movie.movie_animation.controller;

import it.movie.movie_animation.entity.News;
import it.movie.movie_animation.implment.controller.NewsControllerImpl;
import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.ReqNewsDto;
import it.movie.movie_animation.repository.NewsRepository;
import it.movie.movie_animation.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/news")
@CrossOrigin
public class NewsController implements NewsControllerImpl {

    private final NewsService newsService;
    private final NewsRepository newsRepository;

    @Override
    @GetMapping("/active")
    public HttpEntity<?> getUserActiveNews() {
        List<News> activeNews = newsRepository.findAllByIsArchivedFalseAndEndDateAfter(LocalDate.now());
        return ResponseEntity.ok(activeNews);
    }

    @Override
    @GetMapping("/archive")
    public HttpEntity<?> archiveNewsAdmin() {
        List<News> archivedNews = newsRepository.findAllByIsArchivedTrue();
        return ResponseEntity.ok(archivedNews);
    }

    @Override
    @PostMapping
    public HttpEntity<?> addNews(@RequestBody ReqNewsDto reqNewsDto) {
        ApiResponse apiResponse = newsService.addNews(reqNewsDto);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    public HttpEntity<?> editeNews(@RequestBody ReqNewsDto reqNewsDto, @PathVariable UUID id) {
        ApiResponse apiResponse = newsService.editeNews(reqNewsDto, id);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    public HttpEntity<?> deleteNews(@PathVariable UUID id) {
        ApiResponse apiResponse = newsService.deleteNews(id);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponse);
    }
}
