package com.TaskMaster.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TaskMaster.Entitis.Tarefas;
import com.TaskMaster.repository.TarefasRepository;

@Service
public class TarefasService {
    
    @Autowired
    TarefasRepository tarefasRepository;

    public Tarefas findByid(Integer id){
        Optional<Tarefas> tarefas = tarefasRepository.findById(id);
        return tarefas.orElse(null);
    }

    public List<Tarefas> findAll(){
        List<Tarefas> tarefas = tarefasRepository.findAll();
        return tarefas;
    }

    public Tarefas save(Tarefas tarefas){
        return tarefasRepository.save(tarefas);
    }

    public void delete(Integer id){
        tarefasRepository.deleteById(id);
    }

    public Tarefas update(Integer id, Tarefas tarefas){
        Tarefas alterado = findByid(id);

        if(alterado != null){
            alterado.setTitulo(tarefas.getTitulo());
            alterado.setDescricao(tarefas.getDescricao());
            alterado.setDataVencimento(tarefas.getDataVencimento());
            alterado.setPrioridade(tarefas.getPrioridade());
            alterado.setStatus(tarefas.getStatus());
            return tarefasRepository.save(alterado);
        }
        return null;
    }
}