import React from "react";

const CandidateCard = ({ c }) => {
  return (
    <div className="candidate-card">
      <img
        src={c.img}
        alt={c.name}
        className="candidate-card__img"
        style={{ borderColor: c.color }}
      />
      <h3 className="candidate-card__nome">{c.name}</h3>
      <div className="candidate-card__info">
        <p className="candidate-card__info">
          <span>Idade:</span> {c.idade_eleicao} anos
        </p>
        {c.cargos && (
          <p>
            <span>Cargos:</span> {c.cargos.split(";").join(", ")}
          </p>
        )}
        {c.apoio_partidario && (
          <p>
            <span>Apoio partidário:</span> {c.apoio_partidario}
          </p>
        )}
        {c.apoios_outros && (
          <p>
            <span>Outros apoios:</span> {c.apoios_outros}
          </p>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
