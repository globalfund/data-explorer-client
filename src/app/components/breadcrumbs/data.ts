export interface BreadcrumbItem {
  label: string;
  link?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
