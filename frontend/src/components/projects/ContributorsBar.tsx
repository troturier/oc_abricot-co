import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { getDisplayName, pluralize } from "@/lib/format";
import type { User } from "@/lib/types";

/** Grey "Contributeurs — n personnes" band of the project page. */
export function ContributorsBar({ owner, people }: { owner: User; people: User[] }) {
  return (
    <section
      aria-labelledby="contributors-title"
      className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-gray-100 px-6 py-5 sm:px-[50px]"
    >
      <h2 id="contributors-title" className="flex items-baseline gap-2 font-heading text-lg font-semibold text-ink-soft">
        Contributeurs
        <span className="font-sans text-base font-normal text-gray-600">{pluralize(people.length, "personne")}</span>
      </h2>
      <ul className="flex flex-wrap items-center gap-2">
        {people.map((user) => (
          <li key={user.id} className="flex items-center gap-1">
            <Avatar user={user} tone={user.id === owner.id ? "brand" : "grey"} decorative />
            {user.id === owner.id ? (
              <Tag tone="brand">
                Propriétaire<span className="sr-only"> : {getDisplayName(user)}</span>
              </Tag>
            ) : (
              <Tag>{getDisplayName(user)}</Tag>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
