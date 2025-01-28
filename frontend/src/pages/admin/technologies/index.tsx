import { useCreateTechnologyMutation, useTechnologiesQuery } from "@/graphql/generated/schema";
import { FormEvent, useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Technologies() {
  const { data: technologiesData, loading: technologiesLoading, error: technologiesError, refetch } = useTechnologiesQuery({});

  const [createTechnology] = useCreateTechnologyMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    await createTechnology({ variables: { data: { ...formJSON } } });
    await refetch();
  };

  return (
    <Layout title="Admin Technologies - Portfolio CAudrel">
      <section className="technologies">
        <h1>Technologies</h1>
        <div className="display-techno-btn">
          {technologiesData?.technologies?.map((techno) => (
            <button className="button-techno" key={techno.id}>
              {techno?.name}
            </button>
          )) || <p>Aucune technologie disponible.</p>}
        </div>
        <h2>Ajouter une technologie</h2>
        <div className="techno-form-frame">
          <form onSubmit={handleSubmit} className="form">
            <div className="labels">
              <div className="label">
                <label className="" htmlFor="name">
                  <span className="">Nom de la technologie</span>
                </label>
                <input required type="text" name="name" id="name" placeholder="Laravel" className="" autoComplete="on" />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label" htmlFor="src_icon">
                  <span className="label-text">Nom du fichier image</span>
                </label>
                <input type="text" name="src_icon" id="src_icon" required placeholder="laravel.svg" className="" autoComplete="on" />
              </div>
            </div>

            <div className="form-validation">
              <button className="btn-secondary">Enregistrer</button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
