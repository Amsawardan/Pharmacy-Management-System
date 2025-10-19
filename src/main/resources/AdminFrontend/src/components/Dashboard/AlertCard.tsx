import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  title: string;
  count: number;
  description: string;
  icon: ReactNode;
  actionText: string;
  onAction: () => void;
  severity: "low" | "medium" | "high";
  items?: Array<{
    name: string;
    detail: string;
  }>;
}

export function AlertCard({
  title,
  count,
  description,
  icon,
  actionText,
  onAction,
  severity,
  items = [],
}: AlertCardProps) {
  const severityStyles = {
    low: "border-yellow-700/30 bg-yellow-700/5",
    medium: "border-red-700/30 bg-red-700/5",
    high: "border-red-700/30 bg-red-700/5",
  };

  const severityColors = {
    low: "bg-yellow-700 text-white",
    medium: "bg-red-700 text-white", 
    high: "bg-red-700 text-white",
  };

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-card", severityStyles[severity])}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground">{icon}</div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Badge className={cn(severityColors[severity])}>
            {count}
          </Badge>
        </div>
      </CardHeader>
      
      {items.length > 0 && (
        <CardContent className="pt-0">
          <div className="space-y-2 mb-4">
            {items.slice(0, 3).map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">{item.detail}</span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{items.length - 3} more items
              </p>
            )}
          </div>
          
          <Button 
            onClick={onAction}
            className="w-full"
            variant="outline"
            size="sm"
          >
            {actionText}
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}