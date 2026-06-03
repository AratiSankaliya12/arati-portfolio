export interface Project {
  id: string;
  name: string;
  status: "complete" | "building";
  description: string;
  tech: string[];
  link: string;
}

export interface PortfolioMode {
  type: "landing" | "terminal" | "digitaltwin";
}
