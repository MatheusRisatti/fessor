import { useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeader";
import { TeacherItem, Teacher }from "../../components/TeacherItem";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

import "./styles.css";
import api from "../../services/api";

export function TeacherList() {
  const [subject, setSubject] = useState("");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    api.get("teacher").then(({ data: { records } }) => {
      const teachers = records.map((record: any) => record.fields);
      setTeachers(teachers);
    })
  }, [])

  function searchTeachers(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "Matemática", label: "Matemática" },
              { value: "Química", label: "Química" },
              { value: "Português", label: "Português" },
              { value: "História", label: "História" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeek_day(e.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Horário"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.length === 0 && <p>Carregando</p>}
        {teachers.map((teacher: Teacher) => 
          <TeacherItem key={teacher.id} teacher={teacher} />
        )}
      </main>
    </div>
  );
}
