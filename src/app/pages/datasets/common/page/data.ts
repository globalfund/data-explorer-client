import { BreadcrumbItem } from "app/components/breadcrumbs/data";

export interface DatasetPageProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  toolbarRightContent?: React.ReactNode;
}
