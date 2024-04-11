from django.urls import path
from .views import (exercise_detail_view, 
                    exercise_list_view,
                    exercise_create_view,
                    exercise_update_view,
                    exercise_delete_view,

                    exercise_category_detail_view,
                    exercise_category_list_view,
                    exercise_category_create_view,
                    exercise_category_update_view,
                    exercise_category_delete_view,

                    training_plan_detail_view,
                    training_plan_list_view,
                    training_plan_update_view,
                    training_plan_create_view,
                    training_plan_delete_view,
                    main_plan_view,

                    raports_delete_view,
                    raports_create_view,
                    raports_detail_view,
                    raports_list_view,
                    raports_update_view)
                    

urlpatterns = [
    path('exercise-detail/<int:pk>', exercise_detail_view, name="exercise-detail"),
    path('exercise-list/', exercise_list_view, name="exercise-list"),
    path('exercise-create/', exercise_create_view, name="exercise-create"),
    path('exercise-update/<int:pk>', exercise_update_view, name="exercise-update"),
    path('exercise-delete/<int:pk>', exercise_delete_view, name="exercise-delete"),

    path('exercise-category-detail/<int:pk>', exercise_category_detail_view, name="exercise-category-detail"),
    path('exercise-category-list/', exercise_category_list_view, name="exercise-category-list"),
    path('exercise-category-create/', exercise_category_create_view, name="exercise-category-create"),
    path('exercise-category-update/<int:pk>', exercise_category_update_view, name="exercise-category-update"),
    path('exercise-category-delete/<int:pk>', exercise_category_delete_view, name="exercise-category-delete"),
    
    path('training-plan-detail/<int:pk>', training_plan_detail_view, name="training-plan-detail"),
    path('training-plan-list/', training_plan_list_view, name="training-plan-list"),
    path('training-plan-update/<int:pk>', training_plan_update_view, name="training-plan-update"),
    path('training-plan-create/', training_plan_create_view, name="training-plan-create"),
    path('training-plan-delete/<int:pk>', training_plan_delete_view, name="training-plan-delete"),
    path('main-plan/', main_plan_view, name="main-plan"),

    path('raports-detail/<int:pk>', raports_detail_view, name="raports-detail"),
    path('raports-list/', raports_list_view, name="raports-list"),
    path('raports-create/', raports_create_view, name="raports-create"),
    path('raports-update/<int:pk>', raports_update_view, name="raports-update"),
    path('raports-delete/<int:pk>', raports_delete_view, name="raports-delete"),
]
