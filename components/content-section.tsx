import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ContentSectionProps {
  title: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function ContentSection({ title, children, className, icon }: ContentSectionProps) {
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-lg", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none dark:prose-invert">{children}</div>
      </CardContent>
    </Card>
  )
}

