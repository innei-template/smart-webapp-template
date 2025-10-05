import { Button } from '~/components/ui/button'

import { name, repository } from '../../../package.json'

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* 主要内容 */}
          <div className="flex items-center space-x-3 text-sm text-text-secondary">
            <span>Made with ❤️ by</span>
            <a
              href="https://github.com/innei"
              target="_blank"
              rel="noopener noreferrer"
              className="h-auto p-0 text-text-secondary hover:text-text font-medium flex items-center space-x-1"
            >
              <i className="i-mingcute-github-line text-base" />
              <span>@Innei</span>
            </a>
          </div>

          {/* 项目链接 */}
          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant="ghost"
              className="h-auto px-3 py-1.5 text-xs text-text-secondary hover:text-text"
            >
              <a
                href={repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5"
              >
                <i className="i-mingcute-code-line text-sm" />
                <span>View Source</span>
              </a>
            </Button>

            <div className="w-px h-4 bg-separator" />

            <span className="text-xs text-text-secondary">{name}</span>
          </div>

          {/* 版权信息 */}
          <div className="text-xs text-text-tertiary text-center">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
