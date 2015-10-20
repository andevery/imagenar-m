require 'sshkit'
require 'sshkit/dsl'
require 'optparse'

OptionParser.new do |opts|
  opts.banner = "Usage: deploy.rb [options]"

  opts.on('-u', '--username NAME', 'Username') { |v| USER = v }
  opts.on('-s', '--server HOST', 'Destination host') { |v| SERVER = v }

end.parse!

APP_NAME = "imagenar-m"
LOCAL_TARGET = "target"
APP_DIR = "/home/#{USER}/#{APP_NAME}"
DEST_TARGET = "#{APP_DIR}/releases/#{Time.now.strftime("%Y%m%dT%H%M%S")}"

run_locally do
  unless test("[ -d #{LOCAL_TARGET} ]")
    execute :mkdir, "#{LOCAL_TARGET}"
  end
  unless test("[ -f #{LOCAL_TARGET}/imagenar-m.tar.gz ]")
    execute :meteor, :build, :target, "--server #{SERVER_IP}"
  end
end

host = SSHKit::Host.new("#{USER}@#{SERVER}")
SSHKit::Backend::Netssh.config.pty = true

on host do
  execute :mkdir, '-p', DEST_TARGET
  upload! "#{LOCAL_TARGET}/imagenar-m.tar.gz", DEST_TARGET
  within DEST_TARGET do
    execute :tar, '-xvf', 'imagenar-m.tar.gz'
  end
  within "#{DEST_TARGET}/bundle/programs/server" do
    execute "/home/#{USER}/.nvm/v0.10.40/bin/npm", :install
  end
  within APP_DIR do
    execute :ln, '-s -f', DEST_TARGET, :current
    execute :sudo, :systemctl, :restart, "#{APP_NAME}.service"
  end
end
