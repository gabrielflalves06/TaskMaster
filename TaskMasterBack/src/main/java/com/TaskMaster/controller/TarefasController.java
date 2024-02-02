package com.TaskMaster.controller;


import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.TaskMaster.Entitis.Tarefas;
import com.TaskMaster.service.TarefasService;



@RestController
@RequestMapping("/Tarefas")
@CrossOrigin(origins = "*")
public class TarefasController {
    
    @Autowired
    private TarefasService tarefasService;

    @GetMapping()
    public List<Tarefas> listagem(){
        List<Tarefas> tarefas = tarefasService.findAll();
        return tarefas;
    }

    @GetMapping("/{id}")
    public Tarefas ListarTarefa(@PathVariable Integer id) {
        Tarefas entity = tarefasService.findByid(id); 
        return entity;
    }
    

    @PostMapping()
    public ResponseEntity<Tarefas> cadastrar(@RequestBody Tarefas entity) {
        try {
            entity = tarefasService.save(entity);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(entity.getId()).toUri();
            return ResponseEntity.created(uri).body(entity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id){
        tarefasService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefas> alterar(@PathVariable Integer id, @RequestBody Tarefas entity) {
        Tarefas alterado = tarefasService.update(id, entity);
        return ResponseEntity.ok().body(alterado);
    }
    

}
