import { useApplications } from "@/hooks/use-app";
import { useUiStore } from "@/store/ui-store";
import { ChevronRight } from "lucide-react";

export function RightPanel() {
  const applicationsQuery = useApplications();

  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const setSelectedAppId = useUiStore((state) => state.setSelectedAppId);

  return (
    <section className="app-list">
      {applicationsQuery.isPending && (
        <>
          <div className="app-list__skeleton" />
          <div className="app-list__skeleton" />
          <div className="app-list__skeleton" />
        </>
      )}

      {applicationsQuery.isError && (
        <div className="app-list__error">
          <p>{applicationsQuery.error.message}</p>

          <button type="button" onClick={() => applicationsQuery.refetch()}>
            Retry
          </button>
        </div>
      )}

      {applicationsQuery.data?.map((application) => (
        <button
          key={application.id}
          type="button"
          className={
            selectedAppId === application.id
              ? "app-list__item app-list__item--active"
              : "app-list__item"
          }
          onClick={() => {
            setSelectedAppId(application.id);
          }}
        >
          <span className="app-list__icon">
            {application.name.charAt(0).toUpperCase()}
          </span>

          <span>{application.name}</span>

          <ChevronRight size={17} />
        </button>
      ))}
    </section>
  );
}
