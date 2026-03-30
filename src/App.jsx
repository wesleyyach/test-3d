import HeroScene from "./components/HeroScene";

export default function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero__content">
          <span className="hero__badge">Experimento 3D</span>
          <h1>Testando React + Three.js no portfólio</h1>
          <p>
            Esta é uma base inicial para explorar elementos 3D com um visual
            moderno, leve e elegante. A ideia aqui é testar sem mexer no seu
            site principal.
          </p>

          <div className="hero__actions">
            <button type="button" className="btn btn--primary">
              Ver ideia
            </button>
            <button type="button" className="btn btn--ghost">
              Explorar visual
            </button>
          </div>
        </div>

        <div className="hero__scene">
          <HeroScene />
        </div>
      </section>
    </main>
  );
}