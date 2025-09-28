import type { getAllPartiesSchema } from "api/schemas/parties";

import type { FC } from "react";
import type { z } from "zod";
import { Party } from "./Party";

export const Parties: FC<{
  parties: z.infer<typeof getAllPartiesSchema.result>;
}> = ({ parties }) => {
  return (
    <div>
      {parties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No parties yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Create your first party to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {parties.map((party) => (
            <Party key={party.id} party={party} />
          ))}
        </div>
      )}
    </div>
  );
};
