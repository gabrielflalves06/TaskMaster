package com.TaskMaster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TaskMaster.Entitis.Tarefas;

@Repository
public interface TarefasRepository extends JpaRepository<Tarefas, Integer> {
    
}
