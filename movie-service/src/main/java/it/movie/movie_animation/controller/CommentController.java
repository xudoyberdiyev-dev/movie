package it.movie.movie_animation.controller;

import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.ReqCommentDto;
import it.movie.movie_animation.payload.ResCommentDto;
import it.movie.movie_animation.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/comment")
@CrossOrigin
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;


    @PostMapping("/{id}")
    public HttpEntity<?> sendComment(@PathVariable UUID id, @RequestBody ReqCommentDto reqCommentDto, Authentication authentication) {
        ApiResponse apiResponse = commentService.addComment(id, reqCommentDto, authentication);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getAllComment(@PathVariable UUID id) {
        List<ResCommentDto> commentAll = commentService.getCommentAll(id);
        return ResponseEntity.ok(commentAll);
    }
}
