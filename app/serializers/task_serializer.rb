class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :scheduled_at
end
