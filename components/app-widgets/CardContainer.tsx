import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

function CardContainer({
  children,
  title,
  subtitle,
  classes,
}: {
  classes?: any;
  children: any;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className={`${classes}`}>
      <Card className="flex border-none flex-col">
        <CardHeader className="items-start pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent className="flex-1 pb-0 mt-3 mb-3">{children}</CardContent>
      </Card>
    </div>
  );
}

export default CardContainer;
